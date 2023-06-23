export interface Record {
  id?:         string;
  email:       string;
  lastname:    string;
  name:        string;
  schedules:   Schedule[];
  update_date: string;
}

export interface Schedule {
  start_time: string;
  end_time:       string;
}
