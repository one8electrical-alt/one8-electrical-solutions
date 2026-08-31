/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { executeMockDbAction } from "./mockDbServer";
import { mockUser } from "./mockSupabaseClient";

export class MockServerQueryBuilder {
  private table: string;
  private action: "select" | "insert" | "update" | "delete" | "upsert" = "select";
  private payload: any = null;
  private filters: { column: string; value: any }[] = [];
  private orderBy: { column: string; ascending: boolean } | null = null;
  private options: any = null;

  constructor(table: string) {
    this.table = table;
  }

  select(fields = "*", options?: any) {
    this.action = "select";
    this.options = options;
    return this;
  }

  insert(rows: any[]) {
    this.action = "insert";
    this.payload = rows;
    return this;
  }

  update(fields: any) {
    this.action = "update";
    this.payload = fields;
    return this;
  }

  delete() {
    this.action = "delete";
    return this;
  }

  upsert(rows: any[], options?: any) {
    this.action = "upsert";
    this.payload = rows;
    this.options = options;
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push({ column, value });
    return this;
  }

  order(column: string, { ascending = true } = {}) {
    this.orderBy = { column, ascending };
    return this;
  }

  // Implementation of then for await compatibility
  async then(onfulfilled: (value: any) => void) {
    try {
      const result = await executeMockDbAction({
        table: this.table,
        action: this.action,
        payload: this.payload,
        filters: this.filters,
        orderBy: this.orderBy,
        options: this.options,
      });
      onfulfilled(result);
    } catch (error: any) {
      onfulfilled({ data: null, error: { message: error.message } });
    }
  }
}

// Server Side mock client generator
export function getMockSupabaseServer(cookieStore?: any) {
  return {
    auth: {
      async signInWithPassword() {
        return { data: { user: null }, error: { message: "Sign in not supported on server mock client" } };
      },

      async signOut() {
        if (cookieStore) {
          cookieStore.delete("mock-session");
        }
        return { error: null };
      },

      async getUser() {
        let hasSession = false;
        if (cookieStore) {
          hasSession = cookieStore.get("mock-session")?.value === "admin-session-token";
        }
        if (hasSession) {
          return { data: { user: mockUser }, error: null };
        }
        return { data: { user: null }, error: null };
      },
    },

    from(table: string) {
      return new MockServerQueryBuilder(table);
    },
  };
}
