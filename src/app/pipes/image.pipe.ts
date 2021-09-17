import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environments/environment";

@Pipe({
  name: "image",
})
export class ImagePipe implements PipeTransform {
  transform(img: string, type: string = "users"): any {
    let url = `${environment.baseUrl}/img`;

    if (!img) {
      return url + "/no-image";
    }

    if (img.indexOf("https") >= 0) {
      return img;
    }

    switch (type) {
      case "users":
        url += "/users/" + img;
        break;

      case "doctors":
        url += "/doctors/" + img;
        break;

      case "hospitals":
        url += "/hospitals/" + img;
        break;

      default:
        console.log("Tipo invalido");
        url + "/no-image";
    }

    return url;
  }
}
