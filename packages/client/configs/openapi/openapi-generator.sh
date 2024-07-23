yarn openapi-generator-cli generate \
  --input-spec ./configs/openapi/swagger.json \
  --generator-name typescript-axios \
  --output src/__codegen__/__openapi__/insurer-server \
  --config ./openapitools.json \
  --skip-validate-spec

