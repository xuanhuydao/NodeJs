module.exports = (objectPagination, query, countProducts) => {
  if (query.page) { 
      objectPagination.currrentPage = parseInt(query.page);
  }

  objectPagination.skip = (objectPagination.currrentPage - 1) * objectPagination.limitItems;

  const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
  objectPagination.totalPage = totalPage;
  
  return objectPagination;
}