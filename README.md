# ohheck.help
The source code for [https://ohheck.help](https://ohheck.help).

A site for surveys for my two favourite youtubers, [aki and chrissu](https://youtube.com/c/OhHeck). If you have any issues, please log them in the [issue tracker](https://github.com/myopicmage/ohheck.help/issues). Thanks for your support!

## Dependencies
1) .net core 1.1
2) nodejs 
3) python2.7 (for node-sass)
4) postgresql 9.6

## Build instructions:

1) install the dependencies
2) clone the repository
3) `cd` into ohheck.help project folder
4) set environment variable ASPNETCORE_ENVIRONMENT=development
5) configure appsettings.development.json with your connection strings. 
6) `dotnet restore`
7) `dotnet ef database update --context ohheck.help.Models.ApplicationDbContext`
8) `dotnet ef database update --context ohheck.help.Models.Data.HeckingContext`
9) `npm install`
10) `npm install -g webpack`
11) `webpack --config webpack.config.vendor.js`
10) `dotnet run` or `dotnet watch run`

**Please note**: the test project is currently not working because integration testing under .net core is *weird*.
