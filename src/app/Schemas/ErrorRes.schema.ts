export interface ErrorRes {
  timestamp: Date;
  status:    number;
  error:     string;
  message:   string;
  path:      string;
}