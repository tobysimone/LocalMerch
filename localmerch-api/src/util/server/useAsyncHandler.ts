const useAsyncHandler = (fn: any) =>  (request: any, response: any, next: any) => {
    fn(request, response, next).catch(next);
}