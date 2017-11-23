namespace ohheck.help.fsharp

open FSharp.Data.Sql

module HeckingContext =
    let [<Literal>] resPath = "bin/Debug/netcoreapp2.0"

    type Context = SqlDataProvider<
                        Common.DatabaseProviderTypes.POSTGRESQL,
                        "Host=localhost;Database=ohheck;Username=ohheck;Password=password",
                        ResolutionPath = resPath,
                        UseOptionTypes = true>
    
    let ctx = Context.GetDataContext()

    printfn "%A" ctx
    (*let surveys = 
        query {
            for survey in ctx.public.Surveys do
                select survey
        }
        |> Seq.toArray*)