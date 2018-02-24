import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // mydate 파이프 기호앞에 값이 첫번째 파라메터로 넘어온다.
    // console.log(value);
    // :다음에 값이 두번째 파라메터로 넘어온다.
    // console.log(args);
    return value.substring(0, 16);
  }

}
