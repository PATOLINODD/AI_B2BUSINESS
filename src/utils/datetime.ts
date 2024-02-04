
/**
 * Function returns date in format dd/mm/yyyy hh:mm:ss
 * @param date
 */
export const UtilDate = {
	dateTimeString(date: Date): string {
		return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	}
}