export interface ModelClass {
  definition: Definition;
  parameters: Parameters;
  resources:  Resources;
}
export interface Definition {
  id: number;
}
export interface Parameters {
  nginx:      false;
  traefik:      false;
  kong:    false;
  haProxy: false;
  sensu:        false;
}
export interface Resources {
  repositories: Repositories;
}
export interface Repositories {
  self: Self;
}
export interface Self {
  refName: string;
}
