import { Pipe, PipeTransform } from '@angular/core';
import { FeedUtils } from '../feedUtils';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform
{
    transform(mainArr: any[], searchText: string, property: string): any
    {
        return FeedUtils.filterArrayByString(mainArr, searchText);
    }
}
