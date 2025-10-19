import { Future } from '@pedromsilva/data-future';

export class CancelledError extends Error {
    public readonly token: CancelToken;

    constructor(token: CancelToken) {
        super("Operation has been cancelled");

        this.token = token;
    }
}

export class CancelToken {
    private _cancellationRequested: boolean = false;

    private readonly _canBeCancelled: boolean = false;

    readonly canBeCanceled: boolean = true;

    protected readonly cancellationFuture: Future<void>;

    readonly cancellationPromise: Promise<void>;

    get cancellationRequested(): boolean {
        return this._cancellationRequested;
    }

    get canBeCancelled(): boolean {
        return this._canBeCancelled;
    }

    constructor(canBeCancelled: boolean = true) {
        this._canBeCancelled = canBeCancelled;

        this.cancellationFuture = new Future();

        this.cancellationPromise = this.cancellationFuture.promise;
    }

    throwIfCancellationRequested(): void {
        if (this.cancellationRequested) {
            throw new CancelledError(this);
        }
    }

    cancel() {
        if (this.canBeCanceled && !this._cancellationRequested) {
            this._cancellationRequested = true;

            this.cancellationFuture.reject(new CancelledError(this));
        }
    }

}