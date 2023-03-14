import { Component, Injectable, OnInit } from '@angular/core';
import { UiassetService } from '../services/services';
import { HttpClient } from '@angular/common/http';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

export type ingress = { id: number; name: string };
export type serviceMesh = { id: number; name: string };
export type clusterVal = { id: number; name: string };
export type Monitoring = { id: number; name: string };

@Component({
  selector: 'app-root',
  templateUrl: './cloudAssetui.component.html',
  styleUrls: ['./cloudAssetui.component.css'],
})
@Injectable()
export class CloudAssetuiComponent implements OnInit {
  ingressList: Array<ingress>;
  serviceMeshList: Array<serviceMesh>;
  clusterValList: Array<clusterVal>;
  MonitoringList: Array<Monitoring>;
  registerForm!: FormGroup;
  submitted = false;
  isChecked = 1;
  isClusterChecked = 1;
  config = 1;
  applyon = 1;
  clusterType = 1;
  apiPayload: any;

  constructor(
    private formBuilder: FormBuilder,
    private UiassetService: UiassetService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    var jsonDropDownList = this.UiassetService.getToolsList();

    jsonDropDownList.subscribe((data) => {
      this.ingressList = data['Ingress'];
    });
    jsonDropDownList.subscribe((data) => {
      this.serviceMeshList = data['serviceMeshList'];
    });
    jsonDropDownList.subscribe((data) => {
      this.clusterValList = data['clusterValList'];
    });
    jsonDropDownList.subscribe((data) => {
      this.MonitoringList = data['MonitoringList'];
    });

    this.registerForm = this.formBuilder.group({
      ingress: new FormControl(null),
      serviceMesh: new FormControl(null),
      Monitoring: new FormControl(null),

      config: new FormControl('rbac'),
      applyon: new FormControl(1),
      clusterType: new FormControl(1),
      items: new FormControl(null),
      clusterVal: [''],
      // devOpsrole: [''],
      // developerRole: [''],
      terraformVault: [''],
      azureVault: [''],
      registryServer: [''],
      loginName: [''],
      password: [''],
      clusterName: [''],
      awsclusterName: [''],
      resourceGroup: [''],
      tenantID: [''],
      subscription: [''],
      sPNID: [''],
      sPNSecret: [''],
      aWSID: [''],
      defaultReg: [''],
      aWSSecret: [''],

      // clusterVal: ['', Validators.required],
      devOpsrole: ['', Validators.required],
      developerRole: ['', Validators.required],
      // terraformVault: ['', Validators.required],
      // azureVault: ['', Validators.required],
      // registryServer: ['', Validators.required],
      // loginName: ['', Validators.required],
      // password: ['', Validators.required],
      // clusterName: ['', Validators.required],
      // awsclusterName: ['', Validators.required],
      // resourceGroup: ['', Validators.required],
      // tenantID: ['', Validators.required],
      // subscription: ['', Validators.required],
      // sPNID: ['', Validators.required],
      // sPNSecret: ['', Validators.required],
      // aWSID: ['', Validators.required],
      // defaultReg: ['', Validators.required],
      // aWSSecret: ['', Validators.required],
    });
  }

  itemSelected(e: any) {
    console.log(e);
  }

  onItemChange(value: any) {
    if (value == 'rbac') {
      this.registerForm.controls['terraformVault'].reset();
      this.registerForm.controls['azureVault'].reset();
    } else if (value == 'vault') {
      this.registerForm.controls['developerRole'].reset();
      this.registerForm.controls['devOpsrole'].reset();
    } else if (value == 'aws') {
      this.registerForm.controls['clusterName'].reset();
      this.registerForm.controls['resourceGroup'].reset();
      this.registerForm.controls['tenantID'].reset();
      this.registerForm.controls['subscription'].reset();
      this.registerForm.controls['sPNID'].reset();
      this.registerForm.controls['sPNSecret'].reset();
    } else if (value == 'azure') {
      this.registerForm.controls['aWSID'].reset();
      this.registerForm.controls['aWSSecret'].reset();
      this.registerForm.controls['defaultReg'].reset();
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(value: any) {
    this.submitted = true;
    if (
      this.registerForm.value['config'] == '1'
        ? (this.registerForm.value['config'] = 'rbac')
        : (this.registerForm.value['config'] = 'vault')
    )
      if (
        this.registerForm.value['applyon'] == '1'
          ? (this.registerForm.value['applyon'] = 'registry')
          : (this.registerForm.value['applyon'] = 'cluster')
      )
        if (this.registerForm.value['clusterType'] == '3') {
          this.registerForm.value['clusterType'] = 'AWS';
        } else if (this.registerForm.value['clusterType'] == '2') {
          this.registerForm.value['clusterType'] = 'Azure';
        } else this.registerForm.value['clusterType'] = '';

    // generating payload for RESTAPI call


    if (this.registerForm.invalid) {
      return;
    }

    var payloadDetails = this.generatePayload(value);

    //generate JSON document as output
    var theJSON = JSON.stringify(payloadDetails);
    var uri =
      'data:application/json;charset=UTF-8,' + encodeURIComponent(theJSON);
    var jsonDoc = document.createElement('a');
    jsonDoc.href = uri;
    jsonDoc.innerHTML = "Right-click and choose 'save link as...'";
    document.body.appendChild(jsonDoc);

    this.UiassetService.PostRESTAPI(payloadDetails).subscribe((res) => {
      console.log(res);
    });
  }

  generatePayload(value: any) {
    this.apiPayload = {
      definition: { id: 28 },
      parameters: {
        ing_NGINX: value['ingress'] == 'ing_NGINX',
        ing_Traefik: value['ingress'] == 'ing_Traefik',
        ing_Kong: value['ingress'] == 'ing_Kong',
        ing_HAProxy: value['ingress'] == 'ing_HAProxy',

        sm_Istio: value['serviceMesh'] == 'sm_Istio',
        sm_Linkerd: value['serviceMesh'] == 'sm_Linkerd',
        sm_Consul_Connect: value['serviceMesh'] == 'sm_Consul_Connect',
        sm_Kuma: value['serviceMesh'] == 'sm_Kuma',

        cluster_kubeBench:
          value['clusterVal'].indexOf('cluster_kube-bench') > -1,
        cluster_kubeval: value['clusterVal']?.indexOf('cluster_kubeval') > -1,
        cluster_kubehunter:
          value['clusterVal']?.indexOf('cluster_kube-hunter') > -1,
        cluster_Sonobuoy: value['clusterVal']?.indexOf('cluster_Sonobuoy') > -1,

        mon_Prometheus: value['Monitoring']?.indexOf('mon_Prometheus') > -1,
        mon_Grafana: value['Monitoring']?.indexOf('mon_Grafana') > -1,
        mon_Filebeat:
          value['Monitoring']?.indexOf('mon_Filebeat/Metricbeat') > -1,
        mon_Zabbix: value['Monitoring']?.indexOf('mon_Zabbix') > -1,
        mon_Sensu: value['Monitoring']?.indexOf('mon_Sensu') > -1,

        config: value['config'],
        applyon: value['applyon'],
        clusterType: value['clusterType'],

        rbac_dev_role: value['devOpsrole'],
        rbac_devops_role: value['developerRole'],

        terra_terraformVault: value['terraformVault'],
        terra_azureVault: value['azureVault'],

        reg_registryServer: value['registryServer'],
        reg_loginName: value['loginName'],
        reg_password: value['password'],

        azure_clusterName: value['clusterName'],
        azure_resourceGroup: value['resourceGroup'],
        azure_tenantID: value['tenantID'],
        azure_subscription: value['subscription'],
        azure_sPNID: value['sPNID'],
        azure_sPNSecret: value['sPNSecret'],

        aws_aWSID: value['aWSID'],
        aws_defaultReg: value['defaultReg'],
        aws_aWSSecret: value['aWSSecret'],
      },
      resources: {
        repositories: { self: { refName: 'refs/heads/Interactive_pipeline' } },
      },
    };
    return this.apiPayload;
  }
}
