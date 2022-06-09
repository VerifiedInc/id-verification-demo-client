const proveStagingInfoMap = [
  {
    phone: '4044327575',
    dob: '1979-05-23'
  },
  {
    phone: '2622907459',
    dob: '5/23/1979'

  },
  {
    phone: '4146308839',
    dob: '2/24/1993'

  }
];

export function getFakeDob (phone: string) {
  const info = proveStagingInfoMap.find(info => info.phone === phone);
  return info ? info.dob : '';
}
