export class PagedList<T> {
    totalRows: number;
    totalPages: number;
    items: T[];
}

export class SearchRequest {
    searchTerm = '';
    sort = '';
    pageNumber = '1';
    pageSize = '10';

    constructor(pageNumber = 1, pageSize = 10, sort = '', searchTerm = '') {
        this.pageNumber = pageNumber.toString();
        this.pageSize = pageSize.toString();
        this.sort = sort || '';
        this.searchTerm = searchTerm || '';
    }
}

export class NameValue {
    value = 0;
    name: string;
}
