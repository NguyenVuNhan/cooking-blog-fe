import { merge, Observable, ObservableInput, from } from "rxjs";
import { map } from "rxjs/operators";

export const actionMerge = <
  O extends { [P in keyof any]: ObservableInput<any> },
  OT extends {
    [K in keyof O]: O[K] extends ObservableInput<infer V>
      ? { type: K; payload: V }
      : unknown;
  }
>(
  input: O
): Observable<OT[keyof O]> =>
  merge(
    ...Object.entries(input).map(
      ([type, stream]) =>
        from(stream).pipe(map((payload) => ({ type, payload } as any))) as any
    )
  );
