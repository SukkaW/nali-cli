<p align="center">
  <img width="550" src="nali-cli.svg">
</p>

<h1 align="center">Nali CLI</h1>

<p align="center">:anchor: Parse geoinfo of IP Address without leaving your terminal</p>

<p align="center">
<a href="https://skk.moe"><img alt="Author" src="https://img.shields.io/badge/Author-Sukka-blue.svg?style=flat-square"/></a>
<a href="https://www.npmjs.com/package/nali-cli"><img alt="Version" src="https://img.shields.io/npm/v/nali-cli.svg?style=flat-square"/></a>
<img alt="License" src="https://img.shields.io/npm/l/nali-cli.svg?style=flat-square"/>
</p>

## Installation

```bash
yarn global add nali-cli
# npm install nali-cli -g
```

## Usage

Query a simple IP address:

```
$ nali 1.145.1.4

1.145.1.4 [澳大利亚 墨尔本 Telstra]
```

Query IP addresses:

```
$ nali 114.5.1.4 191.919.8.10 1.0.0.1

114.5.1.4 [印度尼西亚] 191.919.8.10 1.0.0.1 [美国 APNIC&CloudFlare 公共 DNS 服务器]
```

Query IP addresses from `stdin`:

```
$ dig blog.skk.moe +short | nali

104.18.101.28 [美国 CloudFlare 公司 CDN 节点]
104.18.100.28 [美国 CloudFlare 公司 CDN 节点]
```

Use Nali CLI built-in tools:

```
nali-nslookup blog.skk.moe

Server:         1.0.0.1 [美国 APNIC&CloudFlare 公共 DNS 服务器]
Address:        1.0.0.1 [美国 APNIC&CloudFlare 公共 DNS 服务器]#53

Non-authoritative answer:
Name:   blog.skk.moe
Address: 104.18.101.28 [美国 CloudFlare 公司 CDN 节点]
Name:   blog.skk.moe
Address: 104.18.100.28 [美国 CloudFlare 公司 CDN 节点]
Name:   blog.skk.moe
Address: 2606:4700::6812:641c
Name:   blog.skk.moe
Address: 2606:4700::6812:651c
```

> Nali CLI has built-in tools:
> - `nali-dig`
> - `nali-nslookup`
> - `nali-ping`
> - `nali-tracepath`
> - `nali-traceroute`
>
> Nali required related software installed. For example, in order to use `nali-dig` and `nali-nslookup` you need to have bind (dnsutils) installed.

Update IP Database:

```
nali update
```

## Interface

```
$ nali --help

Usage: nali <command> [options]

Options:
  -v, --version  版本信息
  -h, --help     output usage information

Commands:
  parse          解析 stdin 或参数中的 IP 信息 (默认)
  update         更新 IP 库
  help [cmd]     display help for [cmd]
```

## Related

- [CZ88 QQIP 数据库](http://www.cz88.net/fox/ipdat.shtml) 纯真网络提供的免费离线 IP 数据库
- [lib-qqwry](https://github.com/cnwhy/lib-qqwry) 高效的 Node.js 版纯真 IP 库解析引擎
- [QQWry Mirror](https://qqwry.mirror.noc.one) Just a mirror of qqwry ipdb
- [Nali](https://github.com/SukkaW/Nali) Oringinal Nali CLI, written in C & Perl
- [Commander.js](https://github.com/tj/commander.js) Node.js command-line interfaces made easy

## Author

**Nali CLI** © [Sukka](https://github.com/SukkaW), Released under the [GPL-3.0](./LICENSE) License.<br>
Authored and maintained by Sukka with help from contributors ([list](https://github.com/SukkaW/nali-cli/graphs/contributors)).

> [Personal Website](https://skk.moe) · [Blog](https://blog.skk.moe) · GitHub [@SukkaW](https://github.com/SukkaW) · Telegram Channel [@SukkaChannel](https://t.me/SukkaChannel) · Twitter [@isukkaw](https://twitter.com/isukkaw) · Keybase [@sukka](https://keybase.io/sukka)
