import swal from "sweetalert";

export const successAlert = (title, text) => {
	swal({
		title: `${title}`,
		text: `${text}`,
		icon: "success",
		timer: "5000",
	});
};

export const errorAlert = (title, text) => {
	swal({
		title: `${title}`,
		text: `${text}`,
		icon: "error",
		timer: "5000",
	});
};