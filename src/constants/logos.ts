export interface Logo {
  name: string;
  className: string;
  alt: string;
}

export const LOGOS: Logo[] = [
  { name: 'Cartoon Network', className: 'cartoonNetworkLogo', alt: 'Cartoon Network logo' },
  { name: 'Booking.com', className: 'bookingLogo', alt: 'Booking.com logo' },
  { name: 'Dropbox', className: 'dropboxLogo', alt: 'Dropbox logo' },
  { name: 'Toshiba', className: 'toshibaLogo', alt: 'Toshiba logo' },
  { name: 'Slack', className: 'slackLogo', alt: 'Slack logo' },
  { name: 'Netflix', className: 'netflixLogo', alt: 'Netflix logo' },
  { name: 'Spotify', className: 'spotifyLogo', alt: 'Spotify logo' },
  { name: 'Coca-Cola', className: 'cocaColaLogo', alt: 'Coca-Cola logo' },
  { name: 'RedBull', className: 'redBullLogo', alt: 'RedBull logo' },
];

// Group logos into rows (3 logos per row)
export const LOGO_ROWS: Logo[][] = [
  [LOGOS[0], LOGOS[1], LOGOS[2]],
  [LOGOS[3], LOGOS[4], LOGOS[5]],
  [LOGOS[6], LOGOS[7], LOGOS[8]],
];
