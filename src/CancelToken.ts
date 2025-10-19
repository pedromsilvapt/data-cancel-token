import { Future } from '@pedromsilva/data-future';

export class CancelledError extends Error {
    public readonly token: CancelToken;

    constructor(token: CancelToken) {
        super("Operation has been cancelled");

        this.token = token;
    }
}

export class CancelToken {
    readonly cancellationRequested: boolean;

    readonly canBeCanceled: boolean = true;

    protected readonly cancellationFuture : Future<void>;

    readonly cancellationPromise : Promise<void>;

    constructor () {
        this.cancellationFuture = new Future();

        this.cancellationPromise = this.cancellationFuture.promise;
    }

    throwIfCancellationRequested(): void {
        if (this.cancellationRequested) {
            throw new CancelledError(this);
        }
    }

    cancel () {
        ( this as any ).cancellationRequested = true;
    }
}