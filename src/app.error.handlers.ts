import { FailureResponse } from './responses/response.failure';
export class RouteErrors {
    public handlers(app) {
        app.use((err, req, resp, next) => {
            return FailureResponse.getResponse(resp,
                err.message,
                err,
                err.status);
        });
    }
}