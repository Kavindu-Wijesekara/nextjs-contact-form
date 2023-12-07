import { defer } from "@defer/client";

async function FormSubmit(formData: any) {
    new Promise((resolve) => {
        setTimeout(() => {
            console.log("formData", formData);
            resolve("done");
        }, 30000);
    });
    return formData
}

export default defer(FormSubmit);
