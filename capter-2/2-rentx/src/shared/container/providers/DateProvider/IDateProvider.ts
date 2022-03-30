interface IDateProvider {
  convertToUTC(date: Date): string;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInMinutes(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  dateNow(): Date;
  addDays(date: Date, days: number): Date;
}

export { IDateProvider };
