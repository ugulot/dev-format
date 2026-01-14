/*! *****************************************************************************
This file is modified copy of "lib/lib.es2017.object.d.ts" from "typescript"
npm-package.

Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/// <reference no-default-lib="true"/>

/** @internal */
declare namespace __Utils {
  type Characters<T extends string> = __Characters<T>
  /** @internal */
  type __Characters<T extends string, chars extends readonly string[] = []> =
    T extends `${infer char}${infer rest}` ?
      rest extends '' ?
        [...chars, char] :
        __Characters<rest, [...chars, char]> :
      never

  type ArrayLikeEntries<T extends ArrayLike<unknown>> =
    Array<{ [K in keyof T]: K extends `${number}` ? [K, T[K]] : never }[`${number}`]>

  type Entries<T extends {}> =
    Array<{ [K in keyof T]: K extends string ? [K, T[K]] : never }[keyof T]>
}

interface ObjectConstructor {
  /**
   * Returns an array of values of the enumerable own properties of an object
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   */
  values<T>(o: { [s: string]: T } | ArrayLike<T>): T[]

  /**
   * Returns an array of values of the enumerable own properties of an object
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   */
  values(o: {}): unknown[]

  /**
   * Returns an array of key/values of the enumerable own properties of an object
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   */
  entries<const T extends {}>(o: T):
    object extends T ?
      [string, unknown][] :
    T extends boolean | number | bigint | symbol ?
      [] :
    T extends string ?
      __Utils.ArrayLikeEntries<__Utils.Characters<T>> :
    T extends ArrayLike<unknown> ?
      __Utils.ArrayLikeEntries<T> :
      __Utils.Entries<T>

  /**
   * Returns an object containing all own property descriptors of an object
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   */
  getOwnPropertyDescriptors<T>(o: T): { [P in keyof T]: TypedPropertyDescriptor<T[P]>; } & { [x: string]: PropertyDescriptor }
}
