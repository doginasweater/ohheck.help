# ohheck.help
The source code for [https://ohheck.help](https://ohheck.help).

A site for surveys for my two favourite youtubers, [aki and chrissu](https://youtube.com/c/OhHeck). If you have any issues, please log them in the [issue tracker](https://github.com/myopicmage/ohheck.help/issues). Thanks for your support!

## Dependencies
1) .net core 1.1
2) nodejs 
3) python2.7 (for node-sass)
4) postgresql 9.6

## Build instructions:

1) configure appsettings.development.json with your connection strings. 
2) `yarn install`
3) `yarn run vendor`
4) `dotnet run` or `dotnet watch run`

**Please note**: the test project is currently not working because integration testing under .net core is *weird*.