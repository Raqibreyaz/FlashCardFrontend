import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const showMessage = async ({
  type,
  message,
}: {
  type: SweetAlertIcon;
  message: string;
}):Promise<boolean> => {
  // success:message,title,icon
  // error:message,title,icon
  // info:

  const showObj: { showCancelButton?: boolean; confirmButtonText?: string } = {};

  if (type === "warning") {
    showObj.confirmButtonText = "Delete";
    showObj.showCancelButton = true;
  }

 let result= await withReactContent(Swal).fire({
    title: `${type} Message`,
    icon: type,
    text: message,
    ...showObj
  });

  return result.isConfirmed
};
