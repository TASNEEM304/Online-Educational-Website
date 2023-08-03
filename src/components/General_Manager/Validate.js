import { data } from "jquery";

export default function Validate(data) {
    let errors = {};
  
    if (!data.No) {
      errors.No = ' حقل الزامي';
    }
  
    if (!data.name) {
      errors.name = 'حقل الزامي';
    }
  
   
    return errors;
  }
