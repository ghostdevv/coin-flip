# Coin Flip API

Uses random.org to generate 9 numbers between `0` and `1`, and converts that to `heads` or `tails`. It's best of nine so you need five of a side to win.

## Requesting

GET https://cf.willow.sh/


```json

{
    "result": "heads",
    "heads": 5,
    "tails": 4,
    "sequence": [
        "heads",
        "heads",
        "heads",
        "tails",
        "tails",
        "tails",
        "heads",
        "tails",
        "heads"
    ]
}
```

```ts
type Coin = 'heads' | 'tails'

interface Response {
    result: Coin;
    heads: number;
    tails: number;
    sequence: Coin[]
}
```

## Self Hosting

You can deploy this to Cloudflare workers, all you will need is a [random.org api key](https://api.random.org/dashboard). You should set this key as the `RANDOM_API_KEY` environment variable.
