# Cancel Token

> Simple TypeScript/ES2015 class to emulate cancellation tokens. Does not fully comply yet with the proposed specification.

# Installation
```shell
npm install --save data-cancel-token
```

# Usage
```typescript
import { CancelToken } from 'data-cancel-token';

const token = new CancelToken();

console.log( token.cancellationRequested );

token.cancellationPromise.then( () => console.log( 'cancelled' ) );

token.throwIfCancellationRequested();

token.cancel();
```