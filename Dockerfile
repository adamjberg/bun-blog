FROM oven/bun

COPY . .

RUN bun install

ENTRYPOINT [ "bun", "src/server.tsx" ]