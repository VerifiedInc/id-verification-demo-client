const proveStagingInfoMap = [
  {
    phone: '4044327575',
    dob: '1979-05-23'
  },
  {
    phone: '2622907459',
    dob: '1988-12-11'

  },
  {
    phone: '4146308839',
    dob: '1993-2-24'

  }
];

export function getFakeDob (phone: string) {
  const info = proveStagingInfoMap.find(info => info.phone === phone);
  return info ? info.dob : '';
}
