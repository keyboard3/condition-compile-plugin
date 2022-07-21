const ConstDependency = require("webpack/lib/dependencies/ConstDependency")
class ConditionCompilePlugin {
  /**
   * @param {ConditionCompileOptions} [options]
   */
  constructor(options) {
    /** @type {ConditionCompileOptions} */
    this.userOptions = options || {};
    this.version = ConditionCompilePlugin.version;
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('ConditionCompileOptions', (factory) => {
      factory.hooks.parser
        .for('javascript/auto')
        .tap('ConditionCompileOptions', (parser, options) => {
          //if 语句
          parser.hooks.statementIf.tap('ConditionCompileOptions', (statement) => {
            return conditionExpressionHandle(statement);
          });
          // 三元表达式
          parser.hooks.expressionConditionalOperator
            .tap('ConditionCompileOptions', (expression) => {
              return conditionExpressionHandle(expression);
            });

          function conditionExpressionHandle(expression) {
            if (![
              expression.test.type == "BinaryExpression" && (isValidate(expression.test.left) || isValidate(expression.test.right)),
              expression.test.type == "MemberExpression" && isValidate(expression.test)
            ].includes(true)) return;

            const param = parser.evaluateExpression(expression.test);
            const bool = param.asBool(); // 表达式值转换为布尔值
            const dep = new ConstDependency(
              `${bool}`,
              expression.test.range
            );
            dep.loc = expression.test.loc;
            parser.state.current.addDependency(dep);

            return bool;
          }
        })
    })
  }
}

function isValidate(expression) {
  return expression.type == "MemberExpression" && expression.object.property?.name == "env";
}
ConditionCompilePlugin.version = 1;
module.exports = ConditionCompilePlugin;