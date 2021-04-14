module.exports = (Date) => {
	//date = Date.now();
	const year = date.getFullYear;
	const month = date.getMonth;
	const today = date.getDate;
	const hours = date.getHours;
	const minutes = date.getHours;
	const seconds = date.getSeconds;
	return new Date(Date.UTC(year, month, today, hours, minutes, seconds));
};
