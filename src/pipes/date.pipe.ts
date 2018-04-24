import { Pipe } from "@angular/core";

import { 
    format
} from '../utils/date'

@Pipe({
  name: "dateFormat"
})
export class dateFormat {
  transform(value: any, style: string, ...args) {
    return format(value, style);
  }
}
