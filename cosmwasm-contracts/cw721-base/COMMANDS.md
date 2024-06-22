# CW721

# Manual deployment

### 1 - optimize
```
docker run --rm -v "$(pwd)":/code -e CARGO_TERM_COLOR=always --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry cosmwasm/rust-optimizer:0.12.5
```

### 2 - store
```cmd
archwayd tx wasm store artifacts/cw721_base.wasm --gas auto --gas-prices 0.002utorii --gas-adjustment 1.3 --from wotori --chain-id torii-1 --node https://rpc.torii-1.archway.tech:443 --broadcast-mode block
```

### 3 - Validating artifact deployed to network
```
archwayd query wasm code 198 --node https://rpc.constantine-1.archway.tech:443 artifacts/nftext_manager_download.wasm +6s
Downloading wasm code to artifacts/nftext_manager_download.wasm
```

### 4 - Instantiating contract
```
archwayd tx wasm instantiate 198 {"name":"test"} --label nftext_manager 0.1.0 --admin archway1q35c9uzfvwv052m3k4ffv4vmld6n57uqjm0r2t --gas auto --gas-prices 0.002uconst --gas-adjustment 1.3 --from wotori --chain-id constantine-1 --node https://rpc.constantine-1.archway.tech:443 --broadcast-mode block
```

# Structures
#### JSON encoded constructor arguments example:
```
{
    "name":"artic",
    "symbol":"nft",
    "minter":"archway1sfpyg3jnvqzf4ser62vpeqjdtvet3mfzp2v7za"
}
```
one line:
```
% archway deploy --args '{"name":"Wotori-Studio","symbol":"NFText","minter":"archway1a8dq0wced6q29rppdug7yvk8ek0dsrqwe3hxcz"}'
```

#### Metadata [Standards](https://docs.opensea.io/docs/metadata-standards)
- save metadata as json to ipfs
- [metadata standarts](https://docs.opensea.io/docs/metadata-standards)
```
{
  "name": "The Cat",
  "description": "what a wonderful cat...", 
  "external_url": "https://openseacreatures.io/3", 
  "image": "ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6", 
  "attributes": [ {
      "trait_type": "type", 
      "value": "img"
    } ]
}
```

## Execute
- Mint{token_id, owner, token_uri}
- TransferNft{recipient, token_id}

#### mint command:
```json
{
    "mint":{
        "token_id":"1",
        "owner":"Owner Name",
        "token_uri":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6"
    }
}
```
- one line: `% archway tx --args '{"mint":{"token_id":"1", "owner":"archway1gl8zm42ygtchts2elhn8vr5ps9txmxnc85j4ld", "token_uri":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6", "external_url":"https://wotori.com"}}'`
- or this one line: 'archway tx --args '{"mint":{"token_id":"3", "owner": `archway1gl8zm42ygtchts2elhn8vr5ps9txmxnc85j4ld", "token_uri":"ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6", "image":"https://wotori.com", "description":"text"}}'`

#### Query:
Tokens{owner}
`archway query contract-state smart --args '{"tokens":{"owner":"archway1a8dq0wced6q29rppdug7yvk8ek0dsrqwe3hxcz"}}'`

OwnerOf{token_id}
`archway query contract-state smart --args '{"owner_of":{"token_id":"10"}}'`

NftInfo(token_id)
`% archway query contract-state smart --args '{ "nft_info":{"token_id":"1"} }'`

AllNftInfo(token_id)
`archway query contract-state smart --args '{ "all_nft_info":{"token_id":"1"} }'`
response:
```
{
    "data":
    {
        "access":
        {
            "owner": "archway1a8dq0wced6q29rppdug7yvk8ek0dsrqwe3hxcz",
            "approvals":
            []
        },
        "info":
        {
            "token_uri": "data:application/json;base64, eyJ0aXRsZSI6IlBpbm9jY2hpbyIsImNvbnRlbnQiOiJodHRwczovL2lwZnMuaW8vaXBmcy9RbVNKenJXelRIbm9nM3hCRUxYNk1rZEF4TEVLWURzVlU5Z1hURW1aaE14NE5yIiwidHlwZSI6InRleHQifQ==",
            "extension": null
        }
    }
}
```


num_tokens
`archway query contract-state smart --args '{"num_tokens":{}} '`

owned tokens
`archway query contract-state smart --args '{"tokens":{"owner":"archway1a8dq0wced6q29rppdug7yvk8ek0dsrqwe3hxcz"}}'`