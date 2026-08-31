/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import fs from "fs/promises";
import path from "path";

const MOCK_DB_FILE = path.join(process.cwd(), "src/data/mockDb.json");

async function readMockDb(): Promise<any> {
  try {
    const data = await fs.readFile(MOCK_DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {
      services: [],
      projects: [],
      enquiries: [],
      testimonials: [],
      settings: [],
    };
  }
}

async function writeMockDb(db: any): Promise<void> {
  await fs.writeFile(MOCK_DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}

export async function executeMockDbAction({
  table,
  action,
  payload,
  filters,
  orderBy,
  options,
}: {
  table: string;
  action: string;
  payload: any;
  filters: { column: string; value: any }[];
  orderBy: { column: string; ascending: boolean } | null;
  options: any;
}): Promise<any> {
  const db = await readMockDb();
  
  if (!db[table]) {
    db[table] = [];
  }

  const tableData = db[table] as any[];

  if (action === "select") {
    let filtered = [...tableData];
    
    // Apply filters
    for (const filter of filters) {
      filtered = filtered.filter((row) => row[filter.column] === filter.value);
    }

    // Apply sorting
    if (orderBy) {
      filtered.sort((a, b) => {
        const valA = a[orderBy.column];
        const valB = b[orderBy.column];
        if (valA < valB) return orderBy.ascending ? -1 : 1;
        if (valA > valB) return orderBy.ascending ? 1 : -1;
        return 0;
      });
    }

    const isHead = options?.head === true;
    const countOption = options?.count;

    return {
      data: isHead ? null : filtered,
      error: null,
      count: countOption ? filtered.length : undefined,
    };
  }

  if (action === "insert") {
    const newRows = Array.isArray(payload) ? payload : [payload];
    const inserted = newRows.map((row) => ({
      id: row.id || String(Date.now() + Math.floor(Math.random() * 1000)),
      created_at: row.created_at || new Date().toISOString(),
      ...row,
    }));
    db[table] = [...tableData, ...inserted];
    await writeMockDb(db);
    return { data: inserted, error: null };
  }

  if (action === "update") {
    let updatedCount = 0;
    const updated = tableData.map((row) => {
      const matches = filters.every((f) => row[f.column] === f.value);
      if (matches) {
        updatedCount++;
        return {
          ...row,
          ...payload,
        };
      }
      return row;
    });

    db[table] = updated;
    await writeMockDb(db);
    return { data: payload, error: null, count: updatedCount };
  }

  if (action === "delete") {
    const remaining = tableData.filter((row) => {
      const matches = filters.every((f) => row[f.column] === f.value);
      return !matches;
    });

    db[table] = remaining;
    await writeMockDb(db);
    return { data: null, error: null };
  }

  if (action === "upsert") {
    const rows = Array.isArray(payload) ? payload : [payload];
    const updatedTable = [...tableData];

    for (const row of rows) {
      let index = -1;
      if (table === "settings" && row.key) {
        index = updatedTable.findIndex((r) => r.key === row.key);
      } else if (row.id) {
        index = updatedTable.findIndex((r) => r.id === row.id);
      }

      const rowToSave = {
        created_at: row.created_at || new Date().toISOString(),
        ...row,
      };

      if (index !== -1) {
        updatedTable[index] = {
          ...updatedTable[index],
          ...rowToSave,
        };
      } else {
        if (!rowToSave.id && table !== "settings") {
          rowToSave.id = String(Date.now() + Math.floor(Math.random() * 1000));
        }
        updatedTable.push(rowToSave);
      }
    }

    db[table] = updatedTable;
    await writeMockDb(db);
    return { data: rows, error: null };
  }

  return { data: null, error: { message: `Unknown action: ${action}` } };
}
