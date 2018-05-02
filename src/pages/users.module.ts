import { HaokurModule } from "./haokur/haokur.module";
import { DefaultModule } from "./default/default.module";
import { SomeOneModule } from "./someone/someone.module";

export const UsersModule = [
  HaokurModule,
  DefaultModule,
  SomeOneModule,
]