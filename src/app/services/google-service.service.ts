import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  url: string = "https://docs.google.com/forms/d/e/1FAIpQLSdpCxARcwWV5BeH5kjj45vVzJgrdOca4e78vq2KHPB2epx8yw/formResponse";

  constructor(private http: HttpClient){
  }



  post(registers){

    let promise = new Promise((resolve, reject) => {

      for(var i in registers){
        let body = `entry.736264477=${registers[i].first_name}`+
                    `&entry.1216232379=${registers[i].last_name}`+
                    `&entry.1922331484=${registers[i].t_shirt}`+
                    `&entry.1808161308=${registers[i].gender}`+
                    `&entry.982307170=${registers[i].age}`+
                    `&entry.237564014=${registers[i].medical}`+
                    `&entry.475860172=${registers[i].address}`+
                    `&entry.1132819387=${registers[i].address_2}`+
                    `&entry.882873948=${registers[i].city}`+
                    `&entry.1300146252=${registers[i].state}`+
                    `&entry.1995735036=${registers[i].zip_code}`+
                    `&entry.1163380930=${registers[i].email}`+

                    `&entry.1814348022=${registers[i].your_church}`+
                    `&entry.1795731922=${registers[i].your_church_point_of_contact_name}`+
                    `&entry.42598533=${registers[i].your_church_point_of_contact_number}`+
                    
                    `&entry.1822987082=${registers[i].emergency_contact_first_name}`+
                    `&entry.854313620=${registers[i].emergency_contact_last_name}`+
                    `&entry.1752027412=${registers[i].emergency_contact_phone_number}`+
                    `&entry.516070659=${registers[i].emergency_contact_relationship}`+

                    `&entry.1868024724=${registers[i].days_attending}`+
                    `&entry.345154263=${registers[i].cost}`+
                    `&entry.1114223182=Yes`;

        this.http.post(this.url, body,
          {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
          }).subscribe(
            data => resolve(data),
            error => reject(error)
          );
      }
    });

    return promise;
  }


}
