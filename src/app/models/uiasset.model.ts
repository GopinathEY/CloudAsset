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
  istio:      false;
  linkerd:      false;
  consulConnect:        false;
  kuma:      false;
  kubebench:      false;
  kubeval:    false;
  kubehunter: false;
  sonobuoy:      false;
  prometheus:      false;
  filebeat:        false;
  zabbix:      false;
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
