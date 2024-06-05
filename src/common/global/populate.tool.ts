/* eslint-disable @typescript-eslint/no-inferrable-types */
export const _populate = {
  path: '_slots.slot',
  populate: [
    { path: 'wo', select: 'wo_name priority active' },
    { path: 'sku', select: 'sku_name active' },
    { path: 'so', select: 'so_name active' },
    { path: 'po', select: 'po_name active' },
    {
      path: 'order',
      select: 'order_name active',
      populate: {
        path: 'tests',
        select: 'test_name active',
      },
    },
    { path: 'platform', select: 'platform_name description active' },
    {
      path: 'test',
      select: 'test',
    },
    {
      path: 'test',
      populate: {
        path: 'status.type_name',
        select: 'status_name',
      },
    },
    {
      path: 'test',
      populate: {
        path: 'userPass.user_id',
        select: 'name clock img _department',
      },
    },
  ],
};
