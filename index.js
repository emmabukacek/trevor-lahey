const searchIndexWaterfall = (text, ...args) => {
  const matchingRegex = args.find(regex => text.search(regex) !== -1);
  if (!matchingRegex) return text;
  const endOfChangesIndex = text.search(matchingRegex);
  return text.slice(0, endOfChangesIndex).trim();
};

module.exports.getEndOfChanges = text => searchIndexWaterfall(
  text,
  /.*?(?=\*\*.*\*\*)/,
  /.*?(?=#+)/,
  /.*?(?=!\[\])/
);

const bookmark = () => {
  const copyMe = (function() {
    const token = '**Changes**';
    const everythingAfterChangesTitle = document.querySelector('.js-comment-field')
      .value
      .split(token)
      .pop()

    const endOfChanges = getEndOfChanges(everythingAfterChangesTitle);

    document.querySelector('.timeline-comment-wrapper .js-comment-edit-button').click();
    document.querySelector('.js-comment-cancel-button').click();
    const prTitle = document.querySelector('.js-issue-title').innerText.trim();
    const prNumber = document.querySelector('.gh-header-number').innerText.trim();

    const mergeButtonEl = document.querySelector('.btn-group-squash .js-details-target');
    mergeButtonEl.click();
    document.querySelector('.merge-commit-title').value = `${prTitle} (${prNumber})`;
    document.querySelector('.merge-commit-message').value = commitMessage;
    document.querySelector('.merge-branch-form').scrollIntoView();
  })();
};
