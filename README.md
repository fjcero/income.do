# income.do
Income Verification [with Plaid](https://plaid.com/docs/income/)

Here is a [demo of the Plaid Income flow](https://plaid.com/demo/) (Select Bank Income)


So when we get the response from Plaid, we'll store the JSON of the income data in the Durable Object via the Transaction Storage API:
<https://developers.cloudflare.com/workers/runtime-apis/durable-objects/#transactional-storage-api>

Here is some additional background on Cloudflare Durable Objects:

- <https://developers.cloudflare.com/workers/learning/using-durable-objects/>
- <https://blog.cloudflare.com/introducing-workers-durable-objects/>
- <https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/>

Here is the example response from the Plaid Income API:

```
{
  "request_id": "LhQf0THi8SH1yJm",
  "bank_income": [
    {
      "bank_income_id": "abc123",
      "generated_time": "2022-01-31T22:47:53Z",
      "days_requested": 90,
      "items": [
        {
          "last_updated_time": "2022-01-31T22:47:53Z",
          "institution_id": "ins_0",
          "institution_name": "Plaid Bank",
          "item_id": "“eVBnVMp7zdTJLkRNr33Rs6zr7KNJqBFL9DrE6”",
          "bank_income_accounts": [
            {
              "account_id": 
"“GeooLPBGDEunl54q7N3ZcyD5aLPLEai1nkzM9”",
              "mask": "8888",
              "name": "Plaid Checking Account",
              "official_name": "Plaid Checking Account",
              "type": "depository",
              "subtype": "checking",
              "owners": [
                {
                  "addresses": [
                    {
                      "data": {
                        "city": "Malakoff",
                        "country": "US",
                        "postal_code": "14236",
                        "region": "NY",
                        "street": "2992 Cameron Road"
                      },
                      "primary": true
                    },
                    {
                      "data": {
                        "city": "San Matias",
                        "country": "US",
                        "postal_code": "93405-2255",
                        "region": "CA",
                        "street": "2493 Leisure Lane"
                      },
                      "primary": false
                    }
                  ],
                  "emails": [
                    {
                      "data": "accountholder0@example.com",
                      "primary": true,
                      "type": "primary"
                    },
                    {
                      "data": "accountholder1@example.com",
                      "primary": false,
                      "type": "secondary"
                    },
                    {
                      "data": 
"extraordinarily.long.email.username.123456@reallylonghostname.com",
                      "primary": false,
                      "type": "other"
                    }
                  ],
                  "names": [
                    "Alberta Bobbeth Charleson"
                  ],
                  "phone_numbers": [
                    {
                      "data": "1112223333",
                      "primary": false,
                      "type": "home"
                    },
                    {
                      "data": "1112224444",
                      "primary": false,
                      "type": "work"
                    },
                    {
                      "data": "1112225555",
                      "primary": false,
                      "type": "mobile1"
                    }
                  ]
                }
              ]
            }
          ],
          "bank_income_sources": [
            {
              "account_id": "GeooLPBGDEunl54q7N3ZcyD5aLPLEai1nkzM9",
              "income_source_id": 
"“f17efbdd-caab-4278-8ece-963511cd3d51”",
              "income_description": "“PLAID_INC_DIRECT_DEP_PPD”",
              "income_category": "SALARY",
              "start_date": "2021-11-15",
              "end_date": "2022-01-15",
              "pay_frequency": "MONTHLY",
              "total_amount": 300,
              "transaction_count": 1,
              "historical_summary": [
                {
                  "start_date": "2021-11-02",
                  "end_date": "2021-11-30",
                  "total_amount": 100,
                  "iso_currency_code": "USD",
                  "unofficial_currency_code": null,
                  "transactions": [
                    {
                      "amount": -100,
                      "date": "2021-11-15",
                      "name": "“PLAID_INC_DIRECT_DEP_PPD”",
                      "original_description": 
"PLAID_INC_DIRECT_DEP_PPD 123",
                      "pending": false,
                      "transaction_id": 
"6RddrWNwE1uM63Ex5GKLhzlBl76aAZfgzlQNm",
                      "check_number": null,
                      "iso_currency_code": "USD",
                      "unofficial_currency_code": null
                    }
                  ]
                },
                {
                  "start_date": "2021-12-01",
                  "end_date": "2021-12-31",
                  "total_amount": 100,
                  "iso_currency_code": "USD",
                  "unofficial_currency_code": null,
                  "transactions": [
                    {
                      "amount": -100,
                      "date": "2021-12-15",
                      "name": "“PLAID_INC_DIRECT_DEP_PPD”",
                      "original_description": 
"PLAID_INC_DIRECT_DEP_PPD 123",
                      "pending": false,
                      "transaction_id": 
"7BddrWNwE1uM63Ex5GKLhzlBl82aAZfgzlCBl",
                      "check_number": null,
                      "iso_currency_code": "USD",
                      "unofficial_currency_code": null
                    }
                  ]
                },
                {
                  "start_date": "2022-01-01",
                  "end_date": "2021-01-31",
                  "total_amount": 100,
                  "iso_currency_code": "USD",
                  "unofficial_currency_code": null,
                  "transactions": [
                    {
                      "amount": -100,
                      "date": "2022-01-31",
                      "name": "“PLAID_INC_DIRECT_DEP_PPD”",
                      "original_description": 
"PLAID_INC_DIRECT_DEP_PPD 123",
                      "pending": false,
                      "transaction_id": 
"9FddrWNwE1uM95Ex5GKLhzlBl76aAZfgzlNQr",
                      "check_number": null,
                      "iso_currency_code": "USD",
                      "unofficial_currency_code": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "bank_income_summary": {
        "total_amount": 300,
        "iso_currency_code": "USD",
        "unofficial_currency_code": null,
        "start_date": "2021-11-15",
        "end_date": "2022-01-15",
        "income_sources_count": 1,
        "income_categories_count": 1,
        "income_transactions_count": 1,
        "historical_summary": [
          {
            "start_date": "2021-11-02",
            "end_date": "2021-11-30",
            "total_amount": 100,
            "iso_currency_code": "USD",
            "unofficial_currency_code": null,
            "transactions": [
              {
                "amount": -100,
                "date": "2021-11-15",
                "name": "“PLAID_INC_DIRECT_DEP_PPD”",
                "original_description": "PLAID_INC_DIRECT_DEP_PPD 
123",
                "pending": false,
                "transaction_id": 
"6RddrWNwE1uM63Ex5GKLhzlBl76aAZfgzlQNm",
                "check_number": null,
                "iso_currency_code": "USD",
                "unofficial_currency_code": null
              }
            ]
          },
          {
            "start_date": "2021-12-01",
            "end_date": "2021-12-31",
            "total_amount": 100,
            "iso_currency_code": "USD",
            "unofficial_currency_code": null,
            "transactions": [
              {
                "amount": -100,
                "date": "2021-12-15",
                "name": "“PLAID_INC_DIRECT_DEP_PPD”",
                "original_description": "PLAID_INC_DIRECT_DEP_PPD 
123",
                "pending": false,
                "transaction_id": 
"7BddrWNwE1uM63Ex5GKLhzlBl82aAZfgzlCBl",
                "check_number": null,
                "iso_currency_code": "USD",
                "unofficial_currency_code": null
              }
            ]
          },
          {
            "start_date": "2022-01-01",
            "end_date": "2021-01-31",
            "total_amount": 100,
            "iso_currency_code": "USD",
            "unofficial_currency_code": null,
            "transactions": [
              {
                "amount": -100,
                "date": "2022-01-31",
                "name": "“PLAID_INC_DIRECT_DEP_PPD”",
                "original_description": "PLAID_INC_DIRECT_DEP_PPD 
123",
                "pending": false,
                "transaction_id": 
"9FddrWNwE1uM95Ex5GKLhzlBl76aAZfgzlNQr",
                "check_number": null,
                "iso_currency_code": "USD",
                "unofficial_currency_code": null
              }
            ]
          }
        ]
      },
      "warnings": []
    }
  ]
}
```


