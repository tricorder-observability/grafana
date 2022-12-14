import { FieldType } from '../types/dataFrame';

import { DataFrameJSON, dataFrameFromJSON } from './DataFrameJSON';

describe('DataFrame JSON', () => {
  describe('when called with a DataFrame', () => {
    it('should decode values not supported natively in JSON (e.g. NaN, Infinity)', () => {
      const json: DataFrameJSON = {
        schema: {
          fields: [
            { name: 'time', type: FieldType.time },
            { name: 'name', type: FieldType.string },
            { name: 'value', type: FieldType.number },
          ],
        },
        data: {
          values: [
            [100, 200, 300],
            ['a', 'b', 'c'],
            [1, 2, 3],
          ],
          entities: [
            null, // nothing to replace, but keeps the index
            { NaN: [0], Inf: [1], Undef: [2] },
            { NegInf: [2] },
          ],
        },
      };

      const frame = dataFrameFromJSON(json);
      expect(frame).toMatchInlineSnapshot(`
        Object {
          "fields": Array [
            Object {
              "config": Object {},
              "entities": Object {},
              "name": "time",
              "type": "time",
              "values": Array [
                100,
                200,
                300,
              ],
            },
            Object {
              "config": Object {},
              "entities": Object {
                "Inf": Array [
                  1,
                ],
                "NaN": Array [
                  0,
                ],
                "Undef": Array [
                  2,
                ],
              },
              "name": "name",
              "type": "string",
              "values": Array [
                NaN,
                Infinity,
                undefined,
              ],
            },
            Object {
              "config": Object {},
              "entities": Object {
                "NegInf": Array [
                  2,
                ],
              },
              "name": "value",
              "type": "number",
              "values": Array [
                1,
                2,
                -Infinity,
              ],
            },
          ],
          "length": 3,
        }
      `);
    });

    it('should inflate values from enums and switch to string field type', () => {
      const json: DataFrameJSON = {
        schema: {
          fields: [
            { name: 'time', type: FieldType.time },
            { name: 'value', type: FieldType.number },
          ],
        },
        data: {
          values: [
            [100, 200, 300, 400],
            [1, 0, 2, 1],
          ],
          enums: [
            null, // nothing to replace, but keeps the index
            ['foo', 'bar', 'baz'],
          ],
        },
      };

      const frame = dataFrameFromJSON(json);
      expect(frame).toMatchInlineSnapshot(`
        Object {
          "fields": Array [
            Object {
              "config": Object {},
              "entities": Object {},
              "name": "time",
              "type": "time",
              "values": Array [
                100,
                200,
                300,
                400,
              ],
            },
            Object {
              "config": Object {},
              "entities": Object {},
              "name": "value",
              "type": "string",
              "values": Array [
                "bar",
                "foo",
                "baz",
                "bar",
              ],
            },
          ],
          "length": 4,
        }
      `);
    });
  });
});
