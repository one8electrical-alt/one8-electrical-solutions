/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
const MOCK_ADMIN_EMAIL = "admin@one8electrical.com";
const MOCK_ADMIN_PASSWORD = "admin123";

// Simple cookie helper for client side
function getClientCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function setClientCookie(name: string, val: string, maxAge: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${val}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function deleteClientCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=-1; SameSite=Lax`;
}

export const mockUser = {
  id: "mock-admin-id",
  email: MOCK_ADMIN_EMAIL,
  role: "authenticated",
};

export class MockClientQueryBuilder {
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
      const response = await fetch("/api/admin/mock-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: this.table,
          action: this.action,
          payload: this.payload,
          filters: this.filters,
          orderBy: this.orderBy,
          options: this.options,
        }),
      });
      const result = await response.json();
      onfulfilled(result);
    } catch (error: any) {
      onfulfilled({ data: null, error: { message: error.message } });
    }
  }
}

// Client Side mock client
export const mockSupabaseClient = {
  auth: {
    async signInWithPassword({ email, password }: any) {
      if (email === MOCK_ADMIN_EMAIL && password === MOCK_ADMIN_PASSWORD) {
        setClientCookie("mock-session", "admin-session-token", 86400);
        return { data: { user: mockUser }, error: null };
      }
      return { data: { user: null }, error: { message: "Invalid email or password" } };
    },

    async signOut() {
      deleteClientCookie("mock-session");
      return { error: null };
    },

    async getUser() {
      const cookie = getClientCookie("mock-session");
      if (cookie === "admin-session-token") {
        return { data: { user: mockUser }, error: null };
      }
      return { data: { user: null }, error: null };
    },
  },

  from(table: string) {
    return new MockClientQueryBuilder(table);
  },
};
