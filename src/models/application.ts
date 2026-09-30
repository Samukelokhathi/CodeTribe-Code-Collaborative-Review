export type applicationStatus = "Applied" | "Pending" | "Offer";

export interface Application {
  id: number;
  company_name: string;
  job_title: string;
  status: Application;
  applied_at: Date;
}

export type NewApplication = Omit<Application, "id" | "applied_at">;
export type UpdateApplication = Pick<Application, "status">;
