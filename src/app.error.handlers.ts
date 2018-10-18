import { FailureResponse } from './responses/response.failure';
export class RouteErrors {
    public handlers(app) {
        app.use((err, req, res, next) => {
            let errorResponse = FailureResponse.responseObj();
            errorResponse.message = err.message;
            errorResponse.statusCode = err.status || 500;
            errorResponse.error = err;
            res.status(err.status || 500);
            res.json(errorResponse);
        });
    }
}