export interface Horario {
  id?:        string;
  schedules: Schedule[];
  activo:    boolean;
  tocar:     boolean;
  kilowatt:  string;
}

export interface Schedule {
  start_time: string;
  end_time:   string;
}
