
/**
 * Function returns date in format dd/mm/yyyy hh:mm:ss
 * @param date
 */
export const UtilDate = {
	dateTimeString(date: Date): string {
		const day = date.getDate() > 9 ? "0" + date.getDate() : date.getDate();
		const month = date.getMonth() > 9 ? "0" + (date.getMonth()+1) : date.getMonth()+1;
		return `${day}/${month}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	}
}