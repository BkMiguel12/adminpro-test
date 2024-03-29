import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Routes
import { AuthRoutingModule } from "./auth.routing";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
