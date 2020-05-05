import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-on-boarding",
  templateUrl: "./on-boarding.component.html",
  styleUrls: ["./on-boarding.component.scss"],
})
export class OnBoardingComponent implements OnInit {
  slides = [
    {
      img: "../../../assets/img/onb1.png",
      titulo: "Bienvenido a<br>jinkobot",
    },
    {
      img: "../../../assets/img/onb2.png",
      titulo: "El robot didáctico <br> que les encanta",
    },
    {
      img: "../../../assets/img/onb3.png",
      titulo: "Disfruta aprendiendo<br>con jinkobot",
    },
  ];
  constructor(private storage: StorageService, private router: Router) {}

  ngOnInit() {}

  close() {
    this.storage.set("firstTime", false);
    this.storage.setOnBoarding(false);
    this.router.navigate(["/connect"]);
  }
  ngOnChanges() {
    console.log("Cambiado");
  }
}
