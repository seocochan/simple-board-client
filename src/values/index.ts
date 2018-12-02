export const ACCESS_TOKEN = 'accessToken';
export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;
export const EMAIL_MAX_LENGTH = 40;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const categoryMap = {
  ow: { name: '오버워치', icon: null },
  lol: { name: '리그오브레전드', icon: null },
  information: { name: '정보', icon: 'info-circle' },
  party: { name: '파티 구인', icon: 'team' },
  screenshot: { name: '스크린샷', icon: 'picture' }
};

export const roles = {
  ow: ['탱커', '딜러', '힐러', '플렉스'],
  lol: ['탑', '정글', '미드', '원딜', '서포터']
};
