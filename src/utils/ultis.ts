
import { Period } from 'src/types/type';
const ultis = {
  getPublicId: (url: string) => {
    const index = url.indexOf(process.env.CLOUDINARY_ROOT_FOLDER + '/' || '/');
    const filePath = url.slice(index);
    const indexDot = filePath.indexOf('.'); // .png, .mp3, ...
    if (indexDot !== -1) return filePath.slice(0, indexDot); //Public id
    return filePath;
  },
  getThisFirstDateOfMonth: () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  },
  getThisLastDateOfMonth: () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
  },
  getRndInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  getRandomString: (length: number) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  getMonday(date: Date) {
    const day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  },
  getFirstDayOfMonth(d: Date) {
    const date = new Date(d);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  },
  getLastDayOfMonth(d: Date) {
    const date = new Date(d);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  getFirstDayOfYear(d: Date) {
    return new Date(new Date().getFullYear(), 0, 1);
  },
  getLastDayOfYear(d: Date) {
    return new Date(new Date().getFullYear(), 11, 31);
  },
  getBeginDate(period: Period, date): Date {
    return period === 'week'
      ? this.getMonday(date)
      : period === 'month'
      ? this.getFirstDayOfMonth(date)
      : this.getFirstDayOfYear(date);
  },
};
export default ultis;
