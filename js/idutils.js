import { Snowflake } from "@theinternetfolks/snowflake";

export function getSnowflake() {
  var uniqueid = Snowflake.generate({ timestamp: 1649157035498, shard_id: 4 })
  var uuid = '_' + uniqueid; // _6917065950617419944
  console.log(uuid);
}
